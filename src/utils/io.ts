import { formatTextToHTML } from './format';

function init_stdout(): WritableStream {
  return new WritableStream(
    {
      write(text: string): Promise<void> {
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

const streamToWriter = new Map<WritableStream, WritableStreamDefaultWriter>();
function write(text: string, stream: WritableStream): void {
  let writer: WritableStreamDefaultWriter | undefined = streamToWriter.get(stream);
  if (!writer) {
    writer = stream.getWriter();
    streamToWriter.set(stream, writer);
  }
  writer.closed;
  writer.ready.then(() => {
    writer.write(text).then(() => {
      // Scroll down the page
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'instant',
      });
    });
    return;
  });
}

export { init_stdout, write };
