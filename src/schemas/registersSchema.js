import joi from "joi";

const registersSchema = joi.object({
  value: joi.string().required().min(1).max(6),
  name: joi.string().min(4).max(20),
});

export default registersSchema;
