const supertest = require("supertest");
const server = require("../../../server");
const prisma = require("../../../db/index");
const bcrypt = require("bcrypt");

// register tests
describe("/api/auth", () => {
  describe("POST /register", () => {
    const testUser = {
      username: "test",
      password: "somePass",
    };
    beforeEach(() => {
      prisma.users.create = jest.fn().mockResolvedValue({
        ...testUser,
        id: 123,
        password: "hashPass",
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("returns status 201 when token is successful", async () => {
      const res = await supertest(server)
        .post("/api/auth/register")
        .send(testUser);

      expect(res.status).toBe(201);
    });

    test("returns token when successful", async () => {
      const res = await supertest(server)
        .post("/api/auth/register")
        .send(testUser);

      expect(res.body.token).toBeTruthy();
    });

    test("prisma.users.create is called", async () => {
      await supertest(server).post("/api/auth/register").send(testUser);

      expect(prisma.users.create).toHaveBeenCalled();
    });
  });
});

// login tests
describe("/api/auth", () => {
  describe("POST /login", () => {
    const testUser = {
      username: "test",
      password: "somePass",
    };
    beforeEach(() => {
      prisma.users.findUnique = jest.fn().mockResolvedValue({
        ...testUser,
        id: 123,
        password: "hashPass",
      });

      bcrypt.compare = jest.fn().mockResolvedValue(true);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("returns token when successful", async () => {
      const res = await supertest(server)
        .post("/api/auth/login")
        .send(testUser);

      expect(res.body.token).toBeTruthy();
    });

    test("returns status 500 when user doesn't exist", async () => {
      prisma.users.findUnique = jest.fn().mockResolvedValue(null);

      const res = await supertest(server)
        .post("/api/auth/login")
        .send(testUser);

      expect(res.status).toBe(500);
    });
  });
});
