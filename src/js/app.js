import { ajax } from 'rxjs/ajax';
import {
  map, catchError, of, interval, switchMap, filter,
} from 'rxjs';
import Message from './Message';

const list = document.querySelector('.inbox__emails-list');
const url = 'https://ahj-11-polling-back.herokuapp.com/messages/unread';

const time = interval(3000);

const obs$ = time.pipe(
  switchMap(() => ajax(url).pipe(
    map((userResponse) => userResponse.response),
    filter((response) => response.status === 'ok'),
    catchError(() => of({ messages: [] })),
  )),
);
obs$.subscribe((response) => {
  response.messages.forEach((message) => {
    list.append(new Message(message).add());
  });
});
