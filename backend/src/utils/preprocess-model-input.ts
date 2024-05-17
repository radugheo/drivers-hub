import { spawn } from 'child_process';

export const predictPrice = async (features: any): Promise<number> => {
  try {
    const pythonExecutable = './venv/Scripts/python';
    const pythonProcess = spawn(pythonExecutable, ['main.py']);

    pythonProcess.stdin.write(JSON.stringify(features));
    pythonProcess.stdin.end();

    for await (const data of pythonProcess.stdout) {
      return JSON.parse(data.toString());
    }

    for await (const data of pythonProcess.stderr) {
      console.error(`stderr: ${data}`);
      throw new Error(data.toString());
    }

    pythonProcess.on('close', (code) => {
      console.log(`Child process exited with code ${code}`);
      if (code !== 0) {
        throw new Error(`Child process exited with code ${code}`);
      }
    });
  } catch (error) {
    console.error(`Error in preprocessing data: ${error}`);
    throw error;
  }
};
