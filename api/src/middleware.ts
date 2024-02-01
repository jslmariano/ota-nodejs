const middleware = (schema: any, property: any) => {
  return async (req: any, res: any, next: any) => {
    try {
      await schema.validateAsync(req[property]);
      next();
    } catch (error: any) {
      const message = error.details.map((i: any) => i.message).join(',');
      console.log("error", message);
      res.status(422).json({ error: message });
    }
  }
}

export default middleware;
