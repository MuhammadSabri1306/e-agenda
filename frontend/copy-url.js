import childProcess from "child_process";

export default ({ host, port }) => {
	host = host || "localhost";
    port: port || 5173

	const clip = childProcess.spawn("clip");
	const url = `http://${ host }:${ port }/`;

	clip.stdin.end(url);
	console.log("Server's url was copied!"); 
};