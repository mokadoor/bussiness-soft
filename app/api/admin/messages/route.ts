import {
  DELETE as deleteByTable,
  GET as getByTable,
  POST as postByTable,
  PUT as putByTable,
} from '../[table]/route';

const params = { table: 'messages' };

export async function GET(req: Request) {
  return getByTable(req, { params });
}

export async function POST(req: Request) {
  return postByTable(req, { params });
}

export async function PUT(req: Request) {
  return putByTable(req, { params });
}

export async function DELETE(req: Request) {
  return deleteByTable(req, { params });
}
