import { postRegisterSchema, valueIsValid } from "../validations/registers.js";
import * as registerService from "../services/registerService.js";

const postNewRegister = async (req, res) => {
    const entryData = req.body;
    const { value, description, type } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.split("Bearer ")[1];

    const { error } = postRegisterSchema.validate(entryData);
    if (error) return res.status(400).send(error);

    try {
        const formatedValue = registerService.formatValue(value);
        if (valueIsValid.validate({ value: formatedValue }).error)
            return res.sendStatus(400);

        const createdNewRegister = await registerService.postNewRegister({
            formatedValue,
            description,
            type,
            token,
        });
        if (createdNewRegister) {
            res.sendStatus(201);
        } else {
            res.sendStatus(401);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};

const deleteRegister = async (req, res) => {
    const { id } = req.body;

    try {
        await registerService.deleteRegister(id);
        res.sendStatus(204);
    } catch (e) {
        res.sendStatus(500);
    }
};

const getUserRegisters = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.split("Bearer ")[1];

    try {
        const registers = await registerService.getRegistersByUserToken(token);
        if (registers) {
            res.status(200).send(registers);
        } else {
            res.sendStatus(401);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};

export { postNewRegister, getUserRegisters, deleteRegister };
