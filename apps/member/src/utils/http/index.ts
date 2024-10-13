import { createRequest } from '@sztu-association/request';
import { getApp } from '../getApp';

const app = getApp();

const http = createRequest(app.createContext, app.pubsub) as ReturnType<typeof createRequest>;
export default http;
