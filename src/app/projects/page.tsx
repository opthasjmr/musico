'use client';

import { useState } from 'react';
import { FolderIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Project {
  id: string;
  name: string;
  lastModified: string;
  type: 'composition' | 'recording' | 'effect';
}

const initialProjects: Project[] = [
  {
    id: '1',
    name: 'My First Song',
    lastModified: '2023-12-20',
    type: 'composition'
  },
  {
    id: '2',
    name: 'Voice Recording',
    lastModified: '2023-12-19',
    type: 'recording'
  },
  {
    id: '3',
    name: 'Guitar Effects',
    lastModified: '2023-12-18',
    type: 'effect'
  }
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [newProjectName, setNewProjectName] = useState('');
  const [selectedType, setSelectedType] = useState<Project['type']>('composition');

  const createProject = () => {
    if (newProjectName.trim()) {
      const newProject: Project = {
        id: Date.now().toString(),
        name: newProjectName,
        lastModified: new Date().toISOString().split('T')[0],
        type: selectedType
      };
      setProjects([newProject, ...projects]);
      setNewProjectName('');
    }
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-400 mb-8">Projects</h1>

      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Project name"
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg"
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as Project['type'])}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            <option value="composition">Composition</option>
            <option value="recording">Recording</option>
            <option value="effect">Effect</option>
          </select>
          <button
            onClick={createProject}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg"
          >
            Create
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <FolderIcon className="w-6 h-6 text-indigo-400" />
                  <div>
                    <div className="font-medium">{project.name}</div>
                    <div className="text-sm text-gray-400">
                      {project.type} • Last modified: {project.lastModified}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}