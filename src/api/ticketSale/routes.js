import express from 'express';
import { addTicket, getTicketById } from './controller';

import {
  TICKET_SALE_NAME_SPACE as _TICKET_SALE_NAME_SPACE,
  ticketSaleApi,
} from '../../constants/api';

const router = express.Router();

router.post(ticketSaleApi.ADD, addTicket);
router.get(ticketSaleApi.GET_TICKET_BY_ID, getTicketById);

export const TICKET_SALE_NAME_SPACE = _TICKET_SALE_NAME_SPACE;
export default router;
