import Busboy from "busboy";

interface Files {
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
}

interface UseFilesReponse {
  files: Files[];
  fields: any[];
}

async function useFiles(event: any): Promise<UseFilesReponse> {
  return new Promise((res) => {
    const { req } = event;
    const files: Files[] = [];
    const fields: any[] = [];
    const busboy = Busboy({ headers: req.headers });

    busboy.on("file", (name, stream, info) => {
      const { encoding, filename, mimeType } = info;
      let chunks: Uint8Array[] = [];

      stream.on("data", (chunk) => {
        chunks.push(chunk);
      })

      .on("end", () => {
        files.push({
          fieldname: name,
          filename,
          encoding,
          mimetype: mimeType,
          buffer: Buffer.concat(chunks)
        });
      });
    });

    busboy.on("field", (name, value, info) => {
      fields[name as any] = value;
    })

    .on("finish", () => {
      res({ files, fields });
    });

    req.pipe(busboy);
  });
}

export default useFiles;
