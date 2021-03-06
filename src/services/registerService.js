import dayjs from "dayjs";
import * as registerRepository from "../repositories/registerRepository.js";
import * as userRepository from "../repositories/userRepository.js";

const formatValue = (value) => {
    let formatedValue = value.replace(",", "");
    formatedValue = formatedValue.replace(".", "");
    return formatedValue;
};

const postNewRegister = async ({ formatedValue, description, type, token }) => {
    const user = await userRepository.getUserByToken(token);

    if (user) {
        const today = dayjs().format("YYYY-MM-DD");
        const userId = user.id;
        await registerRepository.createRegister({
            userId,
            formatedValue,
            description,
            type,
            token,
            today,
        });

        return true;
    } else {
        return false;
    }
};

const getRegistersByUserToken = async (token) => {
    const user = await userRepository.getUserByToken(token);

    if (user) {
        const registers = registerRepository.getRegisters(user.id);
        return registers;
    } else {
        false;
    }
};

const deleteRegister = async (id) => {
    return await registerRepository.deleteRegister(id);
};

export {
    formatValue,
    postNewRegister,
    getRegistersByUserToken,
    deleteRegister,
};
