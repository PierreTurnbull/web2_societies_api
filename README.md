# API

## Get started

Install the dependencies:

```
npm i
```

Create the database structure and populate it with data:
```
mysql -u <username> -p < db.sql
```

Run the app in development mode.

```
npm start
```

## Routes

- GET votes:
```
http://localhost:3001/vote/<question_id>
```
`question_id` corresponds to the id of a question. Questions are not stored in the database since the user won't interact with it, so there they can be hardcoded.

This request returns a JSON object with fields `id`, `vote_value` and `vote_count` (200), or a message indicating the failure (500).

- POST vote (vote incrementation):
```
http://localhost:3001/vote/<id>
```
`id` is the id of the vote to increment.

This request returns a string that indicates either its success (200) or its failure (500).
