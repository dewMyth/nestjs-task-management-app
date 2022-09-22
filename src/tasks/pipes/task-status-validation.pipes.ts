import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    //metadata is an object that contains information about the argument that is being transformed and its OPTIONAL

    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  //Validation function
  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1; //If value is not in the array, indexOf returns -1 always
  }
}
