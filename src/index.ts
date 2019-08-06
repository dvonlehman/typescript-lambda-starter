import dotenv from 'dotenv';
dotenv.config();

import log from './logging';
import { EventArgs, FunctionResults } from './types';

// Main lambda entry point
export async function handler(event: EventArgs): Promise<FunctionResults> {
  log.info('Starting the lambda function', event);

  try {
    const results: FunctionResults = { numRecordsAffected: 2344 };
    log.info('Function results', results);
    return results;
  } catch (err) {
    log.error(`Unhandled exception: ${err.toString()}`);
    throw err;
  }
}
