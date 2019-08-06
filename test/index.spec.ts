import { EventArgs } from '../src/types';
import { handler } from '../src';

test('run the lambda function', async () => {
  const args: EventArgs = { appId: '23423' };
  const result = await handler(args);
  expect(result.numRecordsAffected).toBe(2344);
});
