const joi = require("joi");
const express = require("express");
const app = express();
const dialogflow_cx = require("@google-cloud/dialogflow-cx");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(3333, () => console.log("listen on port "));

//   const listener = app.listen(process.env.PORT, () => {
//     console.log("Your app is listening on port " + listener.address().port);
//   });

//   const courses = [
//     {id: 1, name: 'course_1'},
//     {id: 2, name: 'course_2'},
//     {id: 3, name: 'course_3'},

// ];

app.get("/", (request, response) => {
  response.send("Hello Montreal Bibliothech_check");
});

app.post("/", (req, response) => {
  const tag = req.body.fulfillmentInfo.tag;
  const jsonResponse = {};
  if (tag === "welcome tag") {
    jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: ["Hi, response from webhook"],
          },
        ],
      },
    };
  } else {
    jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: [
              `There are no fulfillment response defined for "${tag}"" tag`,
            ],
          },
        ],
      },
    };
  }

  response.json(jsonResponse);
});

// app.post('/', express.json(), (req, res) => {
//   const agent = new dialogflow_cx.WebhookClient({
//     request : req,
//     response: res,
//   });

// function demo(agent) {
//   agent.add("Sending response fro webhook server");
// };

// // intent match from dialogflow cx
// const IntentMap = new Map();
// IntentMap.set('test_webhook', demo);
// agent.handleRequest(IntentMap);

// });
// app.get('/api/courses', (req, res) => {
//     res.send(courses);
// });

// app.get('/api/courses/name/:name/', (req, res) => {
//     res.send(req.params.name);
// });

// app.get('/api/courses/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if(!course) return res.status(404).send('The course with the given ID not found')
//     res.send(course);
// });

// app.post('/api/courses', (req, res) => {
//         const result = validateCourse(req.body);
//     if(result.error) return res.status(400).send(result.error.details[0].message);

//      const course = {
//         id: courses.length +1,
//         name: req.body.name
//     };
//     courses.push(course);
//     res.send(course);
// });

// app.put('/api/courses/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if(!course) return res.status(404).send('The course with the given ID not found')

//     const result = validateCourse(req.body);
//     if(result.error) return res.status(400).send(result.error.details[0].message);

//     course.name = req.body.name;
//     res.send(course);
// });

// app.delete('/api/courses/:id', (req, res) => {
//     // look up the course
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     // course not found 404
//     if(!course) return res.status(404).send('The course with the given id does not exist')
//     // need to find found --> delete

//     const index = courses.lastIndexOf(course);
//     courses.splice(index, 1);

//     // return the deleted course
//     res.send(course);
// });

// function validateCourse(course){
//     const schema = {
//         name: joi.string().min(3).required()
// };
//     return joi.validate(course, schema);

// };

// // const port = process.env.PORT || 3000;
// // app.listen(port, () => console.log(`Listening on ${port}.....!`))
