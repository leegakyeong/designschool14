import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export default async function MemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const supabase = createClient()
  const { data: members } = await supabase.from('members').select('*, works ( title, image_url )').eq('slug', slug)

  if (!members) return

  const member = members[0]

  return (
    <div>
      <div>{member.name}</div>
      <div>{member.bio}</div>
      <div>{member.website}</div>
      <div>{member.instagram}</div>
      <div className="flex">
        {member.works.map((work: { title: string, image_url: string }) => (
          <div key={work.title}>
            <Image src={work.image_url} width={240} height={340} alt="" />
            <div>{work.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
