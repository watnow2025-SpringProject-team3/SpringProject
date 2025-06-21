import { cache } from 'react';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from './server';

// 認証チェック
const validateAuthWithRedirect = async () => {
    const supabase = createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
        redirect("/login");
    };
    return user;
};

export const cachedValidateAuthWithRedirect = cache(validateAuthWithRedirect);