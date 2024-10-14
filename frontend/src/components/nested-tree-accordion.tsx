import { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react';
import useStore from '@/store';
import usedataStore from '@/dataStore';
import { TreeNode } from '@/types';
import axios from 'axios';

const TreeAccordion = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const setItemId = useStore((state) => state.setItemId);
  const setParentGodownId = useStore((state) => state.setParentGodownId);
  const treeData = usedataStore((state) => state.treeData);
  const updateNode = usedataStore((state) => state.updateNode);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [received, setReceived] = useState<string[]>([]);

  // Function to toggle expansion state
  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Function to fetch and update node data
  const handleAccordion = async (id: string, godown_id: string) => {
    if (!received.includes(id)) {
      try {
        const response = await axios.get(`${apiUrl}/${godown_id}`);
        const fetchedData = response.data;
        updateNode(id, { ...fetchedData });
        setReceived((prev) => [...prev, id]);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
    toggleExpand(id);
  };

  const renderTreeNode = (node: TreeNode) => {
    const isExpanded = expanded.includes(node.id);

    return (
      <div key={node.id} className="w-full">
        <button
          onClick={() => handleAccordion(node.id, node.godown_id)}
          className={`flex items-center gap-2 w-full text-left p-2 hover:bg-gray-100 ${
            isExpanded ? 'font-semibold' : ''
          }`}
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <Folder className="h-4 w-4" />
          {node.name}
        </button>
        {isExpanded && (
          <div className="ml-4 border-l border-l-emerald-500 pl-3">
            {node.children && node.children.length > 0 ? (
              node.children.map(renderTreeNode)
            ) : node.Item && node.Item.length > 0 ? (
              node.Item.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setItemId(item.item_id);
                    setParentGodownId(item.parentGodownId);
                  }}
                  className="flex items-center gap-2 w-full text-left p-2 hover:bg-gray-100"
                >
                  <File className="h-4 w-4 ml-4" />
                  <span>{item.name}</span>
                </button>
              ))
            ) : (
              <div className="p-2">Loading..</div>
            )}
          </div>
        )}
      </div>
    );
  };
  const memoizedTree = useMemo(() => {
    return treeData ? treeData.map(renderTreeNode) : <div>No data available</div>;
  }, [treeData, expanded, received]);

  return (
    <div className="w-full">
      {memoizedTree}
    </div>
  );
};

export default function Component() {
  return <TreeAccordion />;
}
