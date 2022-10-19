
const login = require("../controllers/user/login");
const { User } = require("../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");

describe("Login test", () => {
  it("Should return token,object user with email and subscription", async () => {
    const mReq = {
      body: {
        email: "olya@gmail.com",
        password: "1234567",
      },
    };
    const token = jwt.sign("1", process.env.SECRET_KEY);
    const hashPassword = await bcrypt.hash(mReq.body.password, 10);
    const user = {
      _id: "1",
      email: mReq.body.email,
      password: hashPassword,
      subscription: "pro",
    };

    const mRes = {
      status: 200,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
      token: token,
    };

    jest.spyOn(User, "findOne").mockImplementationOnce(async () => mReq);

    jest
      .spyOn(User, "findOneAndUpdate")
      .mockImplementationOnce(() => mReq, { token });

    expect(mRes.status).toEqual(200);
    expect(mRes.user.email).toEqual(user.email);
    expect(mRes.user.subscription).toEqual(user.subscription);
    expect(mRes.token).toEqual(token);
  });
});
