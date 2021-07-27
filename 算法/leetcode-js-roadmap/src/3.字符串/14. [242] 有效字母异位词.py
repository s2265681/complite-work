class Solution(object):
    def isAnagram(self, s, t):
        return sorted(s) == sorted(t)
       

s = Solution()
print(s.isAnagram('rgf','rfg'))

