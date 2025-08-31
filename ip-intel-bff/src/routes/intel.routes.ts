import { Router, Request, Response } from 'express';
import { isValidIP } from '../utils/validateIP';
import { getIntelData } from '../services/intel.service';

const router = Router();

router.get('/intel', async (req: Request, res: Response) => {

  const ip = req.query.ip as string;

  if (!ip || !isValidIP(ip)) {
    return res.status(400).json({ error: 'Invalid IP address' });
  }

  try {
    const result = await getIntelData(ip);
    console.log(result)
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message});
  }
});

export default router;
