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

This request returns an array with of objects with fields `id`, `vote_value` and `vote_count` (200), or an empty array (404), or a message indicating the failure (500).

Example request:

```
fetch('http://localhost:3001/votes/1')
```

- POST vote (vote incrementation):
```
http://localhost:3001/vote/<id>
```
`id` is the id of the vote to increment.

This request returns a string that indicates either its success (200) or its failure (500).

Example request:

```
fetch('http://localhost:3001/vote/1', {
	method: 'POST'
})
```

- POST feedback:
```
http://localhost:3001/feedback
```
The body shall contain the following fields: `emailAddress`, `feedbackMessage` and `username` (optional).

This request returns a string that indicates either its success (200) or its failure (500).
Headers must contain `'Content-Type': 'application/json'`.

Example request:

```
fetch('http://localhost:3001/feedback', {
	method: 'POST',
	body: JSON.stringify({
		emailAddress: 'tt@tt.tt',
		feedbackMessage: 'My feedback message. GG WP.',
		username: 'tomy'
	}),
	headers: {
		'Content-Type': 'application/json'
	}
})
```