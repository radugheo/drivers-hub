import { spawn } from 'child_process';
import { unlink } from 'fs';

export const predictPrice = async (features: any): Promise<number> => {
  try {
    const pythonExecutable = './venv/Scripts/python';
    const pythonProcess = spawn(pythonExecutable, ['./src/ml-models/predict-price.py']);

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

export const predictImage = (inputPath, outputPath): Promise<any> => {
  return new Promise((resolve, reject) => {
    const pythonExecutable = './venv/Scripts/python';
    const pythonProcess = spawn(pythonExecutable, ['./src/ml-models/predict-symbols.py', inputPath, outputPath]);

    let outputData = '';

    pythonProcess.stdout.on('data', (data) => {
      outputData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(outputData);
          resolve(result);
        } catch (e) {
          reject(`Failed to parse Python output: ${e.message}`);
        }
      } else {
        reject(`Child process exited with code ${code}`);
      }
    });
  });
};

export const cleanupFile = (filePath) => {
  unlink(filePath, (err) => {
    if (err) console.error('Error deleting input image file:', err);
    else console.log('Input image file deleted successfully');
  });
};
