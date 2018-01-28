const mongoose = require('mongoose'),
	Schema = mongoose.Schema;


// create schema
const taskSchema = new Schema({
	name: String, 
	slug: {
			type: String, 
			unique: true
		},
	detail: String
});

// middleware
taskSchema.pre('save', function(next) {
	this.slug = slugify(this.name);
	next();
});


// create the model
const taskModel = mongoose.model('Task', taskSchema);

// export the model
module.exports = taskModel;


// function to slugify
function slugify(text) {
	return text.toString().toLowerCase()
				.replace(/\s+/g, '-')           // Replace spaces with -
			    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
			    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
			    .replace(/^-+/, '')             // Trim - from start of text
			    .replace(/-+$/, '');            // Trim - from end of text)
}