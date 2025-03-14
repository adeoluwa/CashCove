import {z} from "zod";

const logInputSchema = z.object({
  message: z.string(),
  params: z.union([z.array(z.any()), z.object({}).passthrough(), z.string(), z.number()]).optional(),
});

type LogInputType = z.infer<typeof logInputSchema>;

type Serverity = "WARNING" | "INFO" | "DEBUG" | "ERROR";

const logMessage = (input:LogInputType, serverity:Serverity) => {
  const validation = logInputSchema.safeParse(input);

  if(!validation.success){
    throw new Error(`Incorrect log schema: ${validation.error.message}`);
  };
  

  const {message, params}:LogInputType = validation.data;

  switch (serverity){
    case "DEBUG":
      console.debug(message, params);
      break;
    case "ERROR":
      console.error(message, params);
      break;
    case "WARNING":
      console.warn(message, params);
      break;
    default:
      console.info(message, params);
      break;
  }
};

const info = (input:LogInputType) => logMessage(input, "INFO");
const debug = (input: LogInputType) => logMessage(input, "DEBUG");
const error = (input: LogInputType) => logMessage(input, "ERROR");
const warn = (input: LogInputType) => logMessage(input, "WARNING");

export {info, debug, error, warn};