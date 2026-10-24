import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { scramjetPath } from "@mercuryworkshop/scramjet/path";
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

const output = new URL("../dist/", import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(new URL("../public/", import.meta.url), output, { recursive: true });

for (const [directory, source] of [
	["scram", scramjetPath],
	["libcurl", libcurlPath],
	["baremux", baremuxPath],
]) {
	await cp(source, fileURLToPath(new URL(directory, output)), {
		recursive: true,
	});
}
