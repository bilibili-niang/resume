import {iceMessage} from "icepro";

export const messageAlert = (message, type = "info") => {
	iceMessage({
		message,
		type
	});
};
// 拷贝多层的深克隆
export const deepClone = (obj) => {
	return JSON.parse(JSON.stringify(obj));
};