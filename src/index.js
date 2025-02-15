import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import cors from 'cors'
import twilio from 'twilio'

// import mongoose from 'mongoose'

// import './models/User.js'
// const User = mongoose.model("users")

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const numberTwilio = process.env.TWILIO_NUMBER;
const messagingServiceSid = process.env.MESSAGING_SERVICE_SID
const mongouri = process.env.MongoURI


// mongoose.Promise = global.Promise
// mongoose.set('strictQuery', true)
// mongoose.connect(mongouri).then(() => {
// 	console.log("Conectado com o banco de dados")
// }).catch((err) => {
// 	console.log(err)
// })

const users = [
	{ username : "Marcos AMbrósio" , phone : "944636979"  , date : "02/10/2024"}
]

app.post("/message", async (req, res) => {

	// const { users, message } = req.body;
	// console.log(req)

	// const referer = req.headers['referer']; // URL completa do site que fez a requisição
  	// const origin = req.headers['origin']; // Apenas o domínio de origem

  	// console.log('Referer:', referer);
  	// console.log('Origin:', origin);

  	const { message } = req.body;
	const client = twilio(accountSid, authToken);

	users.map(async (user) => {
		await client.messages
			.create({
				body: message,
				messagingServiceSid,
				from: numberTwilio,
				to: user.phone,
			}).then((message) => {
				console.log("Certo para : " + user.username + " Tel : " + user.phone)
				// console.log(message)
			}).catch(err => {
				console.log("Errado para : " + user.username + " Tel : " + user.phone)
				// console.log(err)
			})
	})

	res.redirect("/")

})

// app.post("/save-user", async (req, res) => {
// 	const { username, phone } = req.body;

// 	const user = await User.findOne({ phone })

// 	if (user) {

// 		res.redirect(http_web_site + "create-user")

// 	} else {

// 		const newUser = {
// 			username,
// 			phone
// 		}

// 		await new User(newUser).save().then(() => {
// 			console.log("Usuario salvo")
// 		}).catch(err => {
// 			console.log(err)
// 		}).finally(() => {
// 			res.redirect(http_web_site)
// 		})

// 	}
// })

app.get("/users", async (req, res) => {
	// const users = await User.find();
	res.json(users);
})

// app.get("/delete-user/:id", (req, res) => {
// 	User.deleteOne({ _id: req.params.id }).then(() => {
// 		console.log("Usuario deletado")
// 	}).catch((err) => {
// 		console.log(err)
// 	}).finally(() => {
// 		res.redirect(http_web_site)
// 	})
// })

// app.post("/edit-user/:id", async (req, res) => {
// 	const { username, phone } = req.body;

// 	const user = await User.findOne({ _id: req.params.id })

// 	if (!user) {
// 		console.log("Usuario inexistente")
// 		res.redirect(http_web_site)
// 		return
// 	}

// 	user.username = username
// 	user.phone = phone

// 	user.save().then(() => {
// 		console.log("Usuario editado")
// 	}).catch((err) => {
// 		console.log(err)
// 	}).finally(() => {
// 		res.redirect(http_web_site)
// 	})
// })

const port = 9091;
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})