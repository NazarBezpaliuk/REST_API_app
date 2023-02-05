const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound(`Contact with id : ${contactId} not found`);
  }
  res.status(200).json({
    message: `Contact with id : ${contactId} successfull updated`,
    result,
  });
};

module.exports = updateContact;