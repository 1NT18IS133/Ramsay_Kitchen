/** @format */

const createError = require("http-errors")
const express = require("express")
const path = require("path")
const logger = require("morgan")
const mongoose = require("mongoose")
const passport = require("passport")

const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")
const dishRouter = require("./routes/dishRouter")
const promoRouter = require("./routes/promoRouter")
const leaderRouter = require("./routes/leaderRouter")
const uploadRouter = require("./routes/uploadRouter")
const favoritesRouter = require("./routes/favoritesRouter")
const commentRouter = require("./routes/commentRouter")

const app = express()

/* const cors = require("cors"); */
const cors = require("./routes/cors")
app.use(cors.corsWithOptions)

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
/* app.use(cookieParser("12345-67890-09876-54321")); */
app.use(express.static(path.join(__dirname, "public")))

mongoose
	.connect(
		"mongodb+srv://admin-name:password@cluster0.9xfuj.mongodb.net/foodRecipe?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(
		(db) => {
			console.log("Connected correctly to mongo server")
		},
		(err) => {
			console.log(err)
		}
	)

app.use(passport.initialize())

app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/dishes", dishRouter)
app.use("/promotions", promoRouter)
app.use("/leaders", leaderRouter)
app.use("/imageUpload", uploadRouter)
app.use("/favorites", favoritesRouter)
app.use("/comments", commentRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get("env") === "development" ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render("error")
})

app.listen(process.env.PORT || 3001, () => console.log("Server started"))
