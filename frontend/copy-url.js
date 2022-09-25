import childProcess from "child_process";

export default ({ host, port }) => {
	const clip = childProcess.spawn("clip");
	const url = `http://${ host }:${ port }/`;

	clip.stdin.end(url);
	console.log("Server's url was copied!"); 
};