class BaseError extends Error {
   status;
   errors;
   constructor(status, messages, errors) {
      super(messages);
      this.status = status;
      this.errors = errors;
   }

   static UnauthorizedError(message = "User is not authorized") {
      return new BaseError(401, message);
   }

   static BadRequest(message, errors = []) {
      return new BaseError(400, message, errors);
   }
   static ValidationError(errors) {
      return new BaseError(400, "Validation Error", errors);
   }
   static NotFound(message, errors = []) {
      return new BaseError(404, message, errors);
   }
}
export default BaseError;
