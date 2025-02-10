<template>
  <div class="column terminal">
    <div class="column" id="output"></div>
    <div class="line">
      <TerminalPrompt :prompt="prompt" @exec="execCommand" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue';
import { type Command, type Context } from '../commands/command';
import { display } from '@/utils/io';
import { getPath } from '@/filesystem/inode';
import { Directory } from '@/filesystem/directory';
import { OpenMode, type ReadableFileI } from '@/filesystem/file';
import { stderr, stdout, stdin } from '@/utils/io';
import { CommandHandler, CommandNotFound } from '@/commands/handler';
import TerminalPrompt from './TerminalPrompt.vue';

const props = defineProps({
  banner: String,
  commands: Array<Command>,
  root: { type: Directory, default: new Directory('', []) },
  username: { type: String, default: 'invite' },
});

onMounted(() => {
  if (props.banner) {
    display(props.banner);
  }

  display('\\033[#E6A439mTip: start by executing `help` command\\033[m\n');
});

let execution_context: Context = {
  username: 'guest',
  working_directory: props.root,
  last_exit_code: 0,
};
const prompt: Ref<string> = ref(
  `\\033[#72BE47m${getPath(execution_context.working_directory)}\\033[m$ `,
);
const commands: Command[] = props.commands || [];
const command_handler: CommandHandler = new CommandHandler(commands, stdin, stdout, stderr);
function execCommand(request: { name: string; params: string[]; line: string } | null): void {
  if (request == null) {
    display(prompt.value);
  } else {
    display(prompt.value + request.line);

    const command_result: Result<Context, CommandNotFound> = command_handler.exec(
      request.name,
      execution_context,
      request.params,
    );
    if (command_result.success) {
      execution_context = command_result.result;
      prompt.value = `\\033[#72BE47m${getPath(execution_context.working_directory)}\\033[m$ `;

      [stderr, stdout].forEach((output) => {
        const reader: ReadableFileI = output.open(OpenMode.Read) as ReadableFileI;
        reader.readLines().forEach((line) => display(line));
      });
    } else {
      display(`Command not found: ${name}\n`);
    }
  }

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'instant',
  });
}
</script>

<style>
a {
  color: white;
}

a:visited {
  color: gray;
}

#commandInput {
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
  color: white;
  caret-color: white;
  caret-shape: block;
}

.terminal {
  color: white;
}

.line {
  display: flex;
  flex-direction: row;
}

.column {
  display: flex;
  flex-direction: column;
}

.prompt {
  margin: 0;

  display: flex;
  flex-direction: row;
}

.command {
  margin: 0;
}

.output {
  margin: 0;
}
</style>
