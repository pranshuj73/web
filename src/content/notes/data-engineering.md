---
title: data engineering for 12 year olds
description: exploring what data engineering is even about
pubDate: Oct 16 2025
hidden: true
---

> warning: all of this is written based on what i know (which is not much) and is basically everything ive learnt over the past 6 or so months.

> note: this blog is just me trying to use feynman's technique to understand everything that's in my head and give it a better shape. yes you are the (genius and technically sound) 12 year old ill be teaching.

---

i actually spent quite some time reading about it since i did not have even the slightest idea before i started working as a data engineer.

turns out, its actually quite simple if we break it down a little and ignore the big scary words.

at its core, data engineering is simply extracting data from some source (`Extract`), cleaning it up so we only have the relevant bits that we need or make the data more meaningful (`Transform`) and then dumping it into another location (`Load`). now, the order of the latter two steps can interchange (ETL or ELT) depending on the use case but that is basically it.

---

okay, maybe that explanation was not enough. let's try to understand this better.

why do we need to extract data and then do all those things?

the simple answer is - the data you get from the source is not *always* in the format you need it to be.

let's try to understand this with a little thought experiment. imagine you are now an honorary employee at TheHostingCompany where users can sign up and host their projects so others around the world can discover and use them. your boss asks you to create a report on:

1. what kind of projects people are hosting (python, nodejs, ruby on rails, or other tech stacks)
2. how many users are subscribed to premium plans (bronze, silver, gold)

to prepare the report, we first need some data. we *extract* this data from the `USERS` table.

but there are too many columns and too much data. doing a `select * from users;` is not a solution when we only care about certain details. so we refine our query to select only the relevant columns.

even then, we need to *summarize* the data into the information our report needs, like counting how many users are on each plan and how many projects use each tech stack.

to make this simpler, let's say we downloaded the `USERS` table into a CSV file. now we use python. why python? because it allows us to easily process and transform data, perform aggregations, and handle larger or more complex datasets than a single SQL query might comfortably manage.

with python, we can write functions that read the CSV, summarize the data into counts for:

1. plans
2. tech stack

and *load* the resulting summaries into a `reports` folder. at this point, we have successfully transformed and loaded the data we extracted from the database!

---

now, say your boss asks you to update this report every 6 hours. you can write a function that extracts the latest data, summarizes it, and updates the report automatically.

in real systems, updates could occur every few minutes or even in real time, and data volumes can range from hundreds of megabytes to hundreds of gigabytes. handling this at scale introduces challenges around performance, storage, and pipeline orchestration, which is why data engineering is critical.

let's build on our example.

say the database has a little auto-suspend mode where it basically suspends when its idle (no requests are being made). this results in our little python program throws an error stating database is down when its actually just cold-starting. we fix this by adding a `retry` feature, where when we detect the database is down (actually suspended) we wait for 5 minutes and make the request again and do it for a max of 3 attempts before giving up and declaring the database is unreachable.

another thing, we need to keep a log of all the metrics related to our little script - records read, duration, success / failure rates, anomalies. and on certain conditions it should alert us so we know to go and fix / update the script if there is a need for it. this is called **observability**.

so far we're doing great.
