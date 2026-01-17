import * as z from 'zod';

export const chatSchema = z.object({
  id: z.string(),
  sender: z.string(),
  text: z.string(),
  timestamp: z.number(),
  roomId: z.string(),
  token: z.string().optional(),
});

export const chatDestroyer = z.object({
  isDestoyed: z.literal(true),
});

export const chatValidatorSchema = {
    chat: {
        message: chatSchema,
        destroy: chatDestroyer
    }
}