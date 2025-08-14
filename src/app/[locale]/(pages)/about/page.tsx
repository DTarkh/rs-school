import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      <div className="mb-20">
        <div className="mt-25">
          <div className="flex flex-col sm:flex-row items-center gap-7">
            <div className="h-[200px] w-[200px] rounded-full overflow-hidden">
              <Image
                src="/dd.jpg"
                alt="David Tarkhnishvili profile"
                width={200}
                height={200}
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-zinc-700 text-3xl font-bold">
                Hey, I&apos;m David. -{' '}
                <span className="text-zinc-800">A React Developer</span>
              </h3>
              <a
                href="https://github.com/DTarkh"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-700 transition-all text-zinc-700 font-semibold text-2xl"
              >
                My github: Dtarkh
              </a>
            </div>
          </div>
        </div>
      </div>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-purple-700 transition-all text-xl font-semibold text-zinc-600"
      >
        RS React Course
      </a>
    </>
  );
}
