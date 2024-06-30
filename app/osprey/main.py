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
    url: str
    rating: int
    red_flag: bool
    green_flag: bool


@app.route('/listing', methods=['POST'])
def post_listing():
    try:
        data = CreateListingForm.parse_obj(request.get_json())
        listing = Listing.create(added_by=config["username"], **data.dict())
        return jsonify(listing.__data__), 201
    except ValidationError as e:
        return jsonify({'error': str(e)}), 400


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
