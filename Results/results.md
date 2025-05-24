## UI Results

In general, the website works as expected, with the exception that there is very little input validation on key fields such as the password, zip code, mobile number, and age.

## API Results

One thing that was really noticeable is that the POST request on the echo server seems to be working as a GET request on the server side, given that when I send a POST request with a body, it doesn't accept it. It only seems to accept things passed on the query string. 