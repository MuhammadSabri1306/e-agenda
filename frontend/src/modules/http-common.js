import axios from "axios";

export default axios.create({
	baseURL: "https://e-agenda.taekwondosulsel.info/api",
	headers: { "Accept": "application/json" }
});