const faqsService = require("@/services/faqs");
const { isValidEmail, isValidPassword } = require("@/utils/validations");

const createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    //Validation
    if (!email || !name ) {
      return res.status(400).json({
        success: false,
        message: "Question and answers are required",
      });
    }

    // Call service
    const result = await faqsService.createFaq(question, answer);

    res.status(201).json(result);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


module.exports = {
    createFaq,
};
