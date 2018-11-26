# Split-B App

Split-B is an app that let users split a bill among friends.

<img src="/Split B Demo 1.png" />  <img src="/Split B Demo 2.png" />

- User can create an account.
- User can create a bill manually by typing items and prices.
- User can edit and delete bills and items.
- User can assign payers for each items.
- User can keep record of the bill for who pay for what.
- User can also attach image file of receipts, the app uses an api to read the text and return items and prices based on the receipts. For now, this feature can only works with these images below so please use these images to test that feature. My future plan is to make the feature work with any receipt images.

Receipt 1: <img src="/src/image/r-1.jpg" />

Receipt 2: <img src="/src/image/r-2.jpg" />

Receipt 3: <img src="/src/image/r-3.jpg" />

Receipt 4: <img src="/src/image/r-4.jpg" />

Receipt 5: <img src="/src/image/r-5.jpg" />

### Run locally:
Run backend:
```
bundle install
rake db:migrate
rails s
```

Frontend:
```
npm i && npm start
```

### [Backend](https://github.com/linh4/split-b-back-end)

### Future Plans:
- Add quantity and discount.
- Add details page of both items and payers in the same page.
- Work on scan receipt feature so it can scan different receipt
