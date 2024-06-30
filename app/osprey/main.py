import json
from flask import Flask, request, jsonify
import threading
from peewee import SqliteDatabase, Model, CharField, IntegerField, BooleanField
import tkinter as tk
import os
import signal

from pydantic import BaseModel, ValidationError

with open('../conf.json') as f:
    config = json.load(f)
app = Flask(__name__)
db = SqliteDatabase(config["db_path"])


class Listing(Model):
    added_by = CharField()
    portal = CharField()
    identifier = CharField()
    title = CharField()
    url = CharField()
    rating = IntegerField()
    red_flag = BooleanField()
    green_flag = BooleanField()

    class Meta:
        database = db


db.connect()
db.create_tables([Listing])


class CreateListingForm(BaseModel):
    portal: str
    identifier: str
    title: str
    url: str
    rating: int
    red_flag: bool
    green_flag: bool


@app.route('/listing', methods=['POST'])
def post_listing():
    try:
        data = CreateListingForm.parse_obj(request.get_json())
        defaults = data.dict()
        identifier = defaults.pop('identifier')
        listing, created = Listing.get_or_create(added_by=config["username"], identifier=identifier, defaults=defaults)
        if not created:
            for field, value in data.dict().items():
                setattr(listing, field, value)
            listing.save()
        return jsonify(listing.__data__), 201 if created else 200
    except ValidationError as e:
        return jsonify({'error': str(e)}), 400


@app.route('/listing', methods=['GET'])
def get_listings():
    identifier = request.args.get('identifier')
    if identifier is None:
        return jsonify({'error': 'Missing listing identifier'}), 400
    data = Listing.select().where(Listing.identifier == identifier)
    user_listing = next(filter(lambda record: record.added_by == config["username"], data), None)
    return jsonify(
        {
            "user_listing": user_listing.__data__ if user_listing else None,
            "other_listings": [record.__data__ for record in data if not user_listing or (user_listing and record.id != user_listing.id)]
        }
    )


def fetch_records():
    records = [record.__data__ for record in Listing.select()]
    return records


def populate_gui(listbox, records):
    listbox.delete(0, tk.END)
    for record in records:
        listbox.insert(tk.END, str(record))


def stop_server():
    os.kill(os.getpid(), signal.SIGINT)


def presentation_layer():
    root = tk.Tk()
    listbox = tk.Listbox(root)
    listbox.pack(fill=tk.BOTH, expand=1)
    button = tk.Button(root, text="Fetch records", command=lambda: populate_gui(listbox, fetch_records()))
    button.pack()
    root.protocol("WM_DELETE_WINDOW", stop_server)
    root.mainloop()


if __name__ == "__main__":
    presentation_thread = threading.Thread(target=presentation_layer)
    presentation_thread.start()
    app.run(port=5000)
