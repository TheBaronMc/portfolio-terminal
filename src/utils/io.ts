import { formatTextToHTML } from './format';

function init_stdout(): WritableStream {
  return new WritableStream(
    {
      write(text: string) {
        return new Promise((resolve) => {
          formatTextToHTML(text).forEach((element) => {
            document.getElementById('output')?.appendChild(element);
          });
          return resolve();
        });
      },
    },
    new CountQueuingStrategy({ highWaterMark: 1 }),
  );
}

const streamToWriter: Map<WritableStream, WritableStreamDefaultWriter> = new Map();
function write(text: string, stream: WritableStream) {
  let writer: WritableStreamDefaultWriter | undefined = streamToWriter.get(stream);
  if (!writer) {
    writer = stream.getWriter();
    streamToWriter.set(stream, writer);
  }
  writer.closed;
  writer.ready.then(() => {
    return writer.write(text);
  });
}

export { init_stdout, write };
