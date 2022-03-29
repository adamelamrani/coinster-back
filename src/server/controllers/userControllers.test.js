const User = require("../../database/models/User");
const { register } = require("./userControllers");

describe("Given a register controller function", () => {
  describe("When it's invoked and it receives a name, username and password", () => {
    test("Then it should call status 201 and JSON with 'Register succesfull' message", async () => {
      const req = {
        body: { name: "Adam", username: "adelamco1", password: "123456" },
      };

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findOne = jest.fn().mockResolvedValue();
      User.create = jest.fn().mockResolvedValue();

      await register(req, res, null);

      expect(User.create).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe("When it's invoked and it doesn't receive neither name, username nor password", () => {
    test("then it should call method json with an error", async () => {
      const req = {
        body: { name: null, username: null, password: null },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue();
      User.create = jest.fn().mockResolvedValue();

      await register(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        error: "One or more requirements are missing",
      });
    });
  });

  describe("When it doesn't receive a body", () => {
    test("Then it should catch an error", async () => {
      const req = { body: {} };
      const next = jest.fn().mockReturnValue();

      User.findOne = jest.fn().mockResolvedValue();
      await register(req, null, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
/* 
describe("Given a login controller function", () => {
  describe("");
}); */
