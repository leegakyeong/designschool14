import Link from 'next/link';
import { createClient } from '@/lib/supabase/client'

export default async function Home() {
  const supabase = createClient()
  const { data: members } = await supabase.from('members').select('name, slug')

  return (
    <div>{members?.map((member) => (
      <Link key={member.name} href={`/members/${member.slug}`}>{member.name}</Link>
    ))}</div>
  );
}
