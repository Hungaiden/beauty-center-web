import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic'; // Khóa metadata để đánh dấu route là công khai (không cần xác thực)
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);