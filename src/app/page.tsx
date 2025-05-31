import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Musico
        </h1>
        <p className="text-xl text-gray-300">
          Next-generation music creation and editing platform
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: 'Music Maker',
            description: 'Create music with our powerful sequencer and instruments',
            href: '/maker'
          },
          {
            title: 'Music Editor',
            description: 'Edit and enhance your audio with professional tools',
            href: '/editor'
          },
          {
            title: 'Music Player',
            description: 'Organize and play your music library',
            href: '/player'
          },
          {
            title: 'Effects',
            description: 'Add professional effects to your tracks',
            href: '/effects'
          },
          {
            title: 'Recording',
            description: 'Record audio and MIDI with precision',
            href: '/recording'
          },
          {
            title: 'Projects',
            description: 'Manage and share your musical projects',
            href: '/projects'
          }
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-3 text-indigo-400">
              {feature.title}
            </h2>
            <p className="text-gray-300 mb-4">{feature.description}</p>
            <Link
              href={feature.href}
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
            >
              Explore
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}