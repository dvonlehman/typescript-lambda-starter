// This interface describes the arguments that are passed to the lambda
// function in the event parameter.
export interface EventArgs {
  appId: string;
}

// This interface provides some high level metrics on what the job
// did. A stringified version of it will be displayed in the Lambda results
// console.
export interface FunctionResults {
  numRecordsAffected: number;
}
