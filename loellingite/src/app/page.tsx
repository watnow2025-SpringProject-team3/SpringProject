import { cachedValidateAuthWithRedirect } from '../../lib/supabase-auth/auth'

export default async function Home() {
    // 未認証の場合は自動的に/loginにリダイレクトされます
    const user = await cachedValidateAuthWithRedirect()
    
    return (
        <div>
            <h1>ホームページ</h1>
            <p>ログイン中のユーザー: {user.email}</p>
        </div>
    )
}
