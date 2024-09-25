import { ApiProperty } from '@nestjs/swagger';
import { Item } from './item.dto';

export class Receipt {
    @ApiProperty()
    Email: string;
    @ApiProperty()
    Phone: string;
    @ApiProperty()
    Taxation: string;
    @ApiProperty({ type: Item })
    Items: Item[];
}

export class Payment {
    @ApiProperty()
    Amount: number;
}
